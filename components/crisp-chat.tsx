"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web"

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("efa5a062-a497-4ea4-9b46-54f822837388");
    }, []);
    return null;
}