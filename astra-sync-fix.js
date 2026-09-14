(function astraflixSyncLock(){
  'use strict';
  if(window.__ASTRAFLIX_SYNC_LOCK__)return;
  window.__ASTRAFLIX_SYNC_LOCK__='1.0.0';

  let generation=0;
  const film=()=>document.querySelector('video');
  const albumFrame=()=>document.querySelector('iframe[title*="Dark Side"],iframe[src*="youtube.com/embed/videoseries"]');
  const isSyncButton=button=>/^(start film \+ score|re-sync both)$/i.test(String(button?.textContent||'').replace(/\s+/g,' ').trim());
  const isStopButton=button=>/^stop$/i.test(String(button?.textContent||'').replace(/\s+/g,' ').trim());

  function setCue(text){
    const cue=document.querySelector('.cue p');
    if(cue)cue.textContent=text;
  }

  function command(frame,func,args=[]){
    try{
      frame?.contentWindow?.postMessage(JSON.stringify({event:'command',func,args}),'https://www.youtube.com');
    }catch(_){ }
  }

  function armFrame(frame){
    try{
      const url=new URL(frame.src,location.href);
      let changed=false;
      if(url.searchParams.get('enablejsapi')!=='1'){url.searchParams.set('enablejsapi','1');changed=true;}
      if(url.searchParams.get('origin')!==location.origin){url.searchParams.set('origin',location.origin);changed=true;}
      if(url.searchParams.get('playsinline')!=='1'){url.searchParams.set('playsinline','1');changed=true;}
      if(changed)frame.src=url.href;
      return changed;
    }catch(_){return false;}
  }

  function releaseTogether(frame,video,token){
    if(token!==generation)return;
    try{video.pause();video.currentTime=0;}catch(_){ }
    command(frame,'seekTo',[0,true]);
    command(frame,'playVideo',[]);
    requestAnimationFrame(()=>{
      if(token!==generation)return;
      try{video.currentTime=0;video.play().catch(()=>{});}catch(_){ }
      setCue('Sync lock active. Film and album were returned to their opening cue together. If YouTube inserts an ad, tap Re-sync both after the ad to create a new shared start moment.');
      window.dispatchEvent(new CustomEvent('astraflix:sync',{detail:{at:Date.now(),mode:'opening-cue'}}));
    });
  }

  function begin(token,attempt=0){
    if(token!==generation)return;
    const video=film();
    const frame=albumFrame();
    if(!video||!frame){
      if(attempt<50)setTimeout(()=>begin(token,attempt+1),40);
      return;
    }

    try{video.pause();video.currentTime=0;}catch(_){ }
    setCue('Sync lock is lining up the movie and album at the opening cue…');

    const reloaded=armFrame(frame);
    let released=false;
    const release=()=>{
      if(released||token!==generation)return;
      released=true;
      releaseTogether(frame,video,token);
    };

    if(reloaded){
      frame.addEventListener('load',()=>setTimeout(release,120),{once:true});
      setTimeout(release,1800);
    }else{
      command(frame,'seekTo',[0,true]);
      setTimeout(release,120);
    }
  }

  document.addEventListener('click',event=>{
    const button=event.target?.closest?.('button');
    if(!button)return;
    if(isStopButton(button)){
      generation++;
      const video=film();
      try{video?.pause();}catch(_){ }
      command(albumFrame(),'pauseVideo',[]);
      return;
    }
    if(!isSyncButton(button))return;
    const token=++generation;
    setTimeout(()=>begin(token),0);
  });
})();
