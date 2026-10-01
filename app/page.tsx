"use client"
import { useState, useEffect, useRef } from "react"
import { Search, Bell, MoreHorizontal, MessageCircle, Camera, User, Mic, MicOff, Video, VideoOff, Phone, Crown, Youtube, Flag } from "lucide-react"

const REGALOS = [
  { id:'corazon', icon:'❤️', coins:10 },
  { id:'fuego', icon:'🔥', coins:50 },
  { id:'diamante', icon:'💎', coins:100 },
  { id:'cohete', icon:'🚀', coins:500 },
  { id:'corona', icon:'👑', coins:1000 },
  { id:'leon', icon:'🦁', coins:5000 },
]

export default function ChamakLive() {
  const [showLive, setShowLive] = useState(false)
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [showYTSearch, setShowYTSearch] = useState(false)
  const [ytInput, setYtInput] = useState("")
  const [giftAnim, setGiftAnim] = useState<string|null>(null)
  const [coins, setCoins] = useState(1250)
  const [showRecarga, setShowRecarga] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [showColgarModal, setShowColgarModal] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [participantes, setParticipantes] = useState(
    Array.from({length:16}, (_,i)=>({
      id:i, posicion:i+1, 
      nombre: i===15? "SANTI 👑 CHAMAK" : `Usuario ${i+1}`,
      micOn:true, camOn: i%3!==0, 
      foto:`https://i.pravatar.cc/150?img=${i+1}`,
      isHost: i===15
    }))
  )

  const pedirPermisos = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
