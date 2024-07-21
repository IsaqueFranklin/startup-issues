import { TextField } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
    <div>
        <TextField.Root placeholder="Search the docs…">
            <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
        </TextField.Root>
    </div>
  )
}

export default NewIssuePage