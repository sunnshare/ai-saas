"use client";

import * as z from "zod";
import axios from 'axios'
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import toast from 'react-hot-toast';
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";

import { Heading } from "@/components/heading";
import { useRouter } from 'next/navigation';
import { Empty } from '@/components/ui/empty';
import { Loader } from '@/components/loader';
import { useProModal } from '@/hooks/use-pro-modal';
import { FormGeneration } from "@/components/form-generation";

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Music Prompt is required",
  }),
});

const MusicPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [music, setMusic] = useState<string>()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  })

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music", values)

      setMusic(response.data.audio)

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
      <Heading title="Music Generation" description="Turn your prompt into music." icon={Music} iconColor="text-emerald-500" bgColor="bg-emerald-500/10" />
      <div className="px-4 lg:px-8">
        <FormGeneration placeholder="Piano solo" form={form} isLoading={isLoading} onSubmit={onSubmit} />
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {!music && !isLoading && (
          <Empty label="No music generated." />
        )}
        {music && (
          <audio controls className="w-full mt-8">
            <source src={music} />
          </audio>
        )}
      </div>
    </div>
  );
}

export default MusicPage;