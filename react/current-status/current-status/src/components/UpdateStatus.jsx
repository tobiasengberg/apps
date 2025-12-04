import React from 'react';
import {useForm} from "react-hook-form";
import {useAddStatus} from "../data/api.js";

const UpdateStatus = () => {
    const {register, handleSubmit} = useForm();

    const addStatus = useAddStatus()
    const onSubmit = (values) => addStatus.mutate({
        status: values.newStatus,
        time: new Date().toISOString()
    })
    return (
        <div>
            <h1>Handle</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className="border border-slate-100" {...register("newStatus")} />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default UpdateStatus;