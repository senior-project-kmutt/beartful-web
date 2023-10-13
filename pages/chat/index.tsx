import { testApi } from "@/services/TestApi"
import { useEffect, useState } from "react"
import axios from "axios";
import { API_URL } from "@/config/constants";
import styles from '@/styles/chat.module.scss'

export default function Home() {
  return (
    <div className={`${styles.container} mx-auto mt-12`}>
      <h1 className="font-bold">CHAT</h1>
      <div className={`${styles.wrap_message}`}>
        <div className="flex justify-end mr-3">
          <div className={`${styles.message_1}`}>ทักครับ ชื่อไรฮ้าฟฟู่ว</div>
        </div>
        <div className="ml-3">
          <div className={`${styles.message_2}`}>ไม่บอกฮ้าฟฟู่ว</div>
        </div>
      </div>
      <div>
        <input placeholder="Write your message !" className={`${styles.input_field}`} type="text" id="fname" name="fname" />
        <button className={`${styles.btn}`}>send</button>
      </div>
    </div>
  )
}
