"use client";
import { useState, useRef, useEffect } from "react";
import { Search, Bell, Menu, MessageCircle, User, Video, Camera, FileText, Radio, Mic, MicOff, VideoOff, PhoneOff, Crown, Youtube, Coins } from "lucide-react";

const GIFTS = [
  { icon: "❤️", name: "Corazón", coins: 10 },
  { icon: "🔥", name: "Fuego", coins: 50 },
  { icon: "💎", name: "Diamante", coins: 100 },
  { icon: "🚀", name: "Cohete", coins: 500 },
  { icon: "👑", name: "Corona", coins: 1000 },
  { icon: "🦁", name: "León", coins: 5000 },
];

export default function ChamakLive() {
  const [showLive, setShowLive] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [youtubeActive, setYoutubeActive] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [bigGift, setBigGift] = useState<string | null>(null);
  const [coins, setCoins] = useState(1250);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [participants, setParticipants] = useState(Array.from({length:16}, (_,i)=>({
    id:i+1, nombre: i===15? "Vos 👑 HOST" : `Usuario ${i+1}`, mic:true, cam: i%3!==0, pos:i+1
  })));

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video:true, audio:true});
      if(videoRef.current) videoRef.current.srcObject = stream;
    } catch{ alert("Dale permiso a cámara y micro para CHAMAK•live"); }
  };
  useEffect(()=>{ if(showLive) startCamera(); },[showLive]);

  const sendGift = (gift:any) => {
    if(coins < gift.coins) return alert("Sin coins! Recargá: 100=$500 500=$2000");
    setCoins(c=>c-gift.coins);
    setBigGift(gift.icon);
    setTimeout(()=>setBigGift(null),2000);
  };
  const getYoutubeId = (url:string) => url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)?.[1];

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-4 h-14">
        <button className="flex items-center gap-1 text-sm"><Search size={18}/> Buscar</button>
        <h1 className="font-black tracking-widest">CHAMAK•live</h1>
        <div className="flex items-center gap-3"><Bell size={20}/><div className="w-7 h-7 bg-white rounded-full"/><Menu size={20}/></div>
      </header>

      <div className="fixed top-14 w-full z-40 bg-white/10 backdrop-blur-2xl border-y border-white/10 px-2 py-2 flex gap-3 overflow-x-auto">
        {Array.from({length:12}).map((_,i)=>(
          <div key={i} className="flex flex-col items-center min-w-[60px]">
            <div className={`w-14 h-14 rounded-full p-[2px] ${i%3===0? 'bg-red-600' : 'bg-gradient-to-tr from-green-400 to-blue-500'}`}>
              <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center text-xs">{i===0? "TU" : i+1}</div>
            </div>
            <span className="text-[10px] mt-1">{i%3===0? "LIVE 🔴" : `User ${i+1}`}</span>
          </div>
        ))}
      </div>

      {!showLive? (
        <main className="pt-32 pb-20">
          {[1,2,3].map(p=>(
            <div key={p} className="h-[calc(100vh-152px)] relative bg-zinc-900 border-b border-zinc-800">
              <img src={`https://picsum.photos/400/800?random=${p}`} className="h-full w-full object-cover"/>
              <div className="absolute bottom-4 left-4"><p className="font-bold">CHAMAK•live Post {p}</p><p className="text-xs">❤️ 1.2k 💬 89 ↗️ Compartir</p></div>
            </div>
          ))}
        </main>
      ) : (
        <div className="pt-14 flex-1 flex flex-col bg-black">
          {youtubeActive && <div className="w-full aspect-video"><iframe className="w-full h-full" src={`https://www.youtube.com/embed/${getYoutubeId(youtubeUrl)}`} allowFullScreen/></div>}
          <div className="flex flex-col items-center py-3 bg-gradient-to-b from-yellow-900/30 to-black">
            <div className="relative"><div className="w-24 h-24 rounded-full border-4 border-yellow-400 overflow-hidden bg-zinc-800"><video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover"/></div><Crown className="absolute -top-3 -right-2 text-yellow-400" size={28} fill="gold"/></div>
            <p className="text-sm font-bold mt-1">Vos 👑 HOST (16)</p>
          </div>
          <div className="grid grid-cols-4 gap-2 p-2">
            {participants.slice(0,15).map(p=>(
              <div key={p.id} className="aspect-[3/4] bg-zinc-900 rounded-xl relative overflow-hidden border border-white/10">
                <div className="absolute top-1 left-1 text-[9px] bg-black/70 px-1 rounded">{p.pos}</div>
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-[10px]">{p.cam? "CAM" : "🎤 AUDIO"}</div>
                <p className="absolute bottom-6 w-full text-center text-[8px] truncate">{p.nombre.slice(0,25)}</p>
                <div className="absolute bottom-1 w-full flex justify-center gap-2">
                  <button onClick={()=>setParticipants(ps=>ps.map(x=>x.id===p.id?{...x, mic:!x.mic}:x))}>{p.mic? <Mic size={10}/> : <MicOff size={10} className="text-red-500"/>}</button>
                  <button onClick={()=>setParticipants(ps=>ps.map(x=>x.id===p.id?{...x, cam:!x.cam}:x))}>{p.cam? <Camera size={10}/> : <VideoOff size={10} className="text-red-500"/>}</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto bg-black/80 backdrop-blur-xl border-t border-white/10 p-2">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {GIFTS.map(g=><button key={g.name} onClick={()=>sendGift(g)} className="min-w-[60px] bg-white/10 rounded-xl p-2 flex flex-col items-center"><span className="text-xl">{g.icon}</span><span className="text-[9px]">{g.coins}🪙</span></button>)}
              <button onClick={()=>alert("Paquetes: 100=$500 500=$2000 1000=$3500 5000=$15000 ARS - Mercado Pago / BNA+")} className="min-w-[70px] bg-yellow-500/20 border border-yellow-500 rounded-xl text-[10px] flex flex-col items-center justify-center"><Coins size={16}/> Recargar</button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <button onClick={()=>{const url=prompt("Link YouTube:"); if(url){setYoutubeUrl(url); setYoutubeActive(true);}}} className="bg-red-600 px-3 py-1 rounded-full text-xs flex items-center gap-1"><Youtube size={14}/> YouTube</button>
              <div className="flex gap-3 items-center"><span className="text-xs">{coins} 🪙</span><button onClick={()=>setShowEndModal(true)} className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center"><PhoneOff/></button></div>
            </div>
          </div>
          {bigGift && <div className="fixed inset-0 flex items-center justify-center text-[120px] animate-bounce pointer-events-none z-[100]">{bigGift}</div>}
          {showEndModal && <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center"><div className="bg-zinc-900 p-6 rounded-2xl text-center"><p>¿Querés desconectarte?</p><div className="flex gap-4 mt-4 justify-center"><button onClick={()=>{setShowLive(false); setShowEndModal(false);}} className="bg-red-600 px-6 py-2 rounded-full">Sí</button><button onClick={()=>setShowEndModal(false)} className="bg-white text-black px-6 py-2 rounded-full">No</button></div></div></div>}
        </div>
      )}

      <footer className="fixed bottom-0 w-full z-50 bg-black/70 backdrop-blur-2xl border-t border-white/10 h-16 flex justify-around items-center px-6">
        <button className="relative"><MessageCircle/><span className="absolute -top-1 -right-1 bg-red-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">3</span></button>
        <button onClick={()=>setShowMenu(!showMenu)} className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black -mt-4 border-4 border-black"><Video size={28}/></button>
        <button><User/></button>
      </footer>

      {showMenu && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-xl rounded-2xl p-3 flex gap-4 border border-white/10 z-50">
          <button onClick={()=>{setShowMenu(false);}} className="flex flex-col items-center gap-1"><Camera size={24}/> Foto</button>
          <button onClick={()=>setShowMenu(false)} className="flex flex-col items-center gap-1"><FileText size={24}/> Post</button>
          <button onClick={()=>{
            const edad=prompt("Fecha nacimiento YYYY-MM-DD (18+ Ley 25.326):"); const ok=confirm("Acepto Términos Ley 25.326 - Datos en Supabase se entregan si policía pide");
            if(!edad||!ok){alert("18+ obligatorio"); return;}
            setShowMenu(false); setShowLive(true);
          }} className="flex flex-col items-center gap-1 text-red-400"><Radio size={24}/> LIVE</button>
        </div>
      )}
    </div>
  );
}