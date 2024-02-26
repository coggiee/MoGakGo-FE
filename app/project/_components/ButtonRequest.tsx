"use client";

import React from "react";

import { useToast } from "@/app/_common/shadcn/ui/use-toast";
import { Button } from "@/app/_common/shadcn/ui/button";

// TODO: projectId, senderId 값은 실제 프로젝트의 id, 사용자 id로 변경해야 합니다.
function ButtonRequest() {
  const { toast } = useToast();

  const handleRequest = async () => {
    const response = await fetch("/api/project/request/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ senderId: 11, projectId: 66 }),
    });

    const { data, status } = await response.json();

    toast({
      title: status === 201 ? "요청이 완료되었습니다." : "요청에 실패했습니다.",
      description:
        status === 201 ? "요청을 수락할 때까지 기다려주세요!" : data.message,
      variant: status === 201 ? "default" : "destructive",
    });
  };

  return <Button onClick={handleRequest}>요청</Button>;
}

export default ButtonRequest;