"use client";
import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";//this library allows the react hook forms to integrate with various data validation libraries like zod.
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from 'zod';
import Spinner from "@/app/components/Spinner";
import ErrorMessage from "@/app/components/ErrorMessage";

// interface IssueForm {//(2)
//   title: string;
//   description: string;
// }

type IssueForm = z.infer<typeof createIssueSchema>;//(2)

const NewIssuePage = () => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  }); //this register function return 4 properties which are used to mark ( take a look on ) the action performed by user.
  const router = useRouter();
  const [ error, setError ] = useState<String>();
  const [isSubmitting, setIsSubmitting ] = useState(false);

  const handlePostData = async ( data: {title: string, description: string}) => {
    try{
      setIsSubmitting(true);
      const response = await axios.post('/api/issues', data);
      console.log(response);
      // setIsSubmitting(false);
      router.push('/issues');
    }
    catch(err){
      setIsSubmitting(false);
      console.log(err);
      setError("An unexpected error occured");
    }
  } 

  return (
    <div className="max-w-xl">
      {
        error && 
        <Callout.Root className="mb-5" color="red">
          <Callout.Text>
            {error}
          </Callout.Text>
        </Callout.Root>
      }
      <form
        className="space-y-3"
        onSubmit={handleSubmit((data) => handlePostData(data))}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage> }
        {/* <TextArea placeholder="Description" /> */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && <ErrorMessage> { errors.description.message }</ErrorMessage> }

        <Button disabled={isSubmitting}>Submit New Issue { isSubmitting && <Spinner/>} </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;

/**
 * simplemde component doesn't allow directly destructuring the regiseter method and apply all the properties on that component, therefore, to make it work we will
 * use Controller component present in the react hook form.
 * The field property that we got from the render method from Controlled component also contains the same properties like blur etc which register contains therefore, e
 * we will destructure it on SimpleMDE.
 * 
 * //(2) Here we have defined the scheam for our form, and also in the validationSchemas.ts file we've defined the schema, so in two places we are defining them, so if in 
 * future something has to be added in them we will need to make changes at two places, therefore, instead of manually defining schema in this file we will use zod infter property
 * and will comment this part out.
 * 
 */
