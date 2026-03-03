import React from 'react'
import { useParams } from 'react-router-dom'

export default function Chat() {
    const {targetUserId}=useParams();
  return (
    <div>Chat</div>
  )
}
