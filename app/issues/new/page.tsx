"use client"
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';

{/*interface IssueForm {
    title: string;
    description: string;
}*/}

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {

    const router = useRouter();
    const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('');

    return (
        <div className="max-w-xl">
            {error && (
                <Callout.Root color="red" className="mb-5">
                    <Callout.Icon>
                        <AiFillInfoCircle />
                    </Callout.Icon>
                    <Callout.Text>
                        You will need admin privileges to install and access this application.
                    </Callout.Text>
                </Callout.Root>
            )}
        <form onSubmit={handleSubmit(async (data) => {
            try {
                await axios.post('/api/issues', data);
                router.push('/issues')
            } catch(error){
                setError('An unexpected error ocurred.')
            }
        })} className="space-y-3">
            <TextField.Root size="3" placeholder="Search the docs…" {...register('title')} />
            {errors.title && <Text color='red' as='p'>{errors.title.message}</Text>}
            <Controller 
                name='description'
                control={control}
                render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
            />
            {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}
            <Button>Submit New Issue</Button>
        </form>
        </div>
    )
}

export default NewIssuePage