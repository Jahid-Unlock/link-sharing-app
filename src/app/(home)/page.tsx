"use client"

import FrontLayout from "@/components/layout/FrontLayout";
import {Grip, Plus} from 'lucide-react';

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '@/redux/slices/counterSlice';

export default function Home() {

    const counterValue = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <FrontLayout>
            <h3 className="lg:text-3xl text-2xl font-semibold text-gray-900 capitalize">Customize your links</h3>
            <p className="text-gray-900/70 mt-3">Add/edit/remove links below and then share all your profiles with the world!</p>
            <button className="flex items-center justify-center gap-2 w-full text-[#633cff] rounded-md border border-[#633cff] mt-8 py-3 hover:bg-[#633cff]/10 duration-150"> <Plus className="h-4 w-4"/> Add Link</button>


            {/* this block will incrase */}
            <div className="mt-5 bg-[#f4f4f4] px-4 py-3 rounded-md">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                        <Grip className="h-4 w-4"/>
                        Link #1
                    </div>
                    <button>Remove</button>
                </div>
                <form action="#" className="mt-4">
                    <input type="text" className="w-full h-10" placeholder="type here"/>
                    <input type="text" className="w-full h-10 mt-2" placeholder="type here"/>
                </form>

                <h1>Counter: {counterValue}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
            </div>
        </FrontLayout>
    );
}
