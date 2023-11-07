import * as z from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormGenerationProps {
  form: any;
  isLoading: boolean;
  placeholder: string;
  onSubmit: (value: any) => void
  children?: React.ReactNode
}

export const FormGeneration = ({ form, isLoading, placeholder, onSubmit, children }: FormGenerationProps) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
      >
        <FormField name="prompt" render={({ field }) => (
          <FormItem className={`col-span-12 ${children ? 'lg:col-span-6' : 'lg:col-span-10'}`}>
            <FormControl className="m-0 p-0">
              <Input
                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                disabled={isLoading}
                placeholder={placeholder}
                {...field}
              />
            </FormControl>
          </FormItem>
        )} />
        {children}
        <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
          Generate
        </Button>
      </form>
    </Form>
  )
}