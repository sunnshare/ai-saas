"use client";

import * as z from "zod";
import axios from 'axios'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import toast from 'react-hot-toast';
import { Video } from "lucide-react";
import { useForm } from "react-hook-form";

import { Heading } from "@/components/heading";
import { Loader } from '@/components/loader';
import { Empty } from '@/components/ui/empty';
import { useProModal } from '@/hooks/use-pro-modal';
import { FormGeneration } from "@/components/form-generation";

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Video Prompt is required",
  }),
});

const VideoPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [video, setVideo] = useState<string>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);

      const response = await axios.post("/api/video", values)

      setVideo(response.data[0])

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen()
      } else {
        toast.error("Something went wrong")
      }
    } finally {
      router.refresh()
    }
  }

  return (
    <div>
      <Heading title="Video Generation" description="Turn your prompt into video." icon={Video} iconColor="text-orange-700" bgColor="bg-orange-700/10" />
      <div className="px-4 lg:px-8">
        <FormGeneration placeholder="Clown fish swimming around a coral reef" form={form} isLoading={isLoading} onSubmit={onSubmit} />
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {!video && !isLoading && (
          <Empty label="No video files generated." />
        )}
        {video && (
          <video controls className="w-full aspect-video mt-8 rounded-lg border bg-black">
            <source src={video} />
          </video>
        )}
      </div>
    </div>
  );
}

export default VideoPage;