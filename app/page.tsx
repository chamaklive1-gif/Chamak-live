"use client";
import { useState } from "react";
export default function Page(){
  const [live,setLive]=useState(false);
  return(
    <main style={{minHeight:"100vh",background:"black",color:"white",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:20}}>
      <h1 style={{fontSize:48,fontWeight:900}}>CHAMAK•live</h1>
      <button onClick={async()=>{
        try{
          const s=await navigator.mediaDevices.getUserMedia({video:true,audio:true});
          s.getTracks().forEach(t=>t.stop());
          setLive(true);
        }catch{ alert("Permitir cámara"); }
      }} style={{padding:"16px 32px",background:"white",color:"black",borderRadius:99,fontWeight:800}}>
        {live?"¡EN VIVO! 🔴":"Activar Live"}
      </button>
    </main>
  )
}