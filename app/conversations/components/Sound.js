import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "@/app/context/AuthContext";

export default function Sound({ data }) {
  const { currentUser } = useAuthContext();
  const [audioPlayed, setAudioPlayed] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) audioRef.current = new Audio("/message.mp3");

    const playAudio = () => {
      if (audioPlayed || !audioRef.current.paused) return;

      const { messages } = data.onConversationUpdate;
      const [firstMessage] = messages || [];
      const senderId = firstMessage?.senderId && firstMessage.senderId;

      if (senderId !== currentUser.id) {
        audioRef.current
          .play()
          .then(() => setAudioPlayed(true))
          .catch((err) => {
            if (err.name === "NotAllowedError") {
              console.log("Audio play blocked by browser autoplay policy.");
            }
          });
      }
    };

    const events = [
      "focus",
      "click",
      "keydown",
      "mousemove",
      "touchstart",
      "mousedown",
      "scroll",
    ];

    if (
      data?.onConversationUpdate &&
      data.onConversationUpdate.tag !== "DELETION"
    ) {
      playAudio();

      if (!audioPlayed) {
        events.forEach((event) =>
          document.addEventListener(event, playAudio, { once: true })
        );
      }
    }

    return () => {
      events.forEach((event) => document.removeEventListener(event, playAudio));
    };
  }, [data?.onConversationUpdate, currentUser.id, audioPlayed]);

  return null;
}
