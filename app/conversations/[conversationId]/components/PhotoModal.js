"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";

export default function PhotoModal({ src, isOpen, onClose }) {
  if (!src) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-80 h-80">
        <Image
          alt="Photo"
          className="object-cover"
          fill
          sizes="(max-width: 100vw) 100% (max-height: 100vh) 100%"
          src={src}
          priority={true}
        />
      </div>
    </Modal>
  );
}
