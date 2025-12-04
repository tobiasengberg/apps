import React from 'react';
import {useForm} from "react-hook-form";

const UpdateStatus = ({status, setStatus}) => {
    const {register, handleSubmit} = useForm();

    const onSubmit = (values) => {setStatus([...status, {status: values.newStatus }]); };
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