'use client'
import FilterDropdown from '@/components/FilterDropdown';
import React, { useEffect, useRef, useState, useContext } from 'react'
import EmployeeTable from './EmployeeTable';
import CreateModal from '@/components/CreateModal';
import UpdateModal from '@/components/UpdateModal';
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    zIndex: 999999,
};
const Page = () => {
    const [filters,setFilters] = useState([]);
    const [results,setResults] = useState([]);
    const [filteredResults,setFilteredResults] = useState([]);
    const [create,setCreate] = useState(false);
    const [edit,setEdit] = useState(false);
    const [id,setId] = useState('');
    const [searchStatus,setSearchStatus] = useState('');
    const { isAuthenticated } = useContext(AuthContext);
    const router = useRouter();
    const searchInput = useRef('');

    useEffect(() => {
        if (!isAuthenticated) {
          router.push('/login'); 
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setSearchStatus('Searching...');
                const response = await fetch("https://deals-dray-backend.vercel.app/employees", {
                    method: "GET",
                    redirect: 'follow',
                });
                
                if (response.ok) {
                    const data = await response.json();
    
                    if (data.length === 0) {
                        setSearchStatus('No Results Found');
                    } else {
                        setResults(data || []);
                        setFilteredResults(data)
                        setSearchStatus('');
                    }
                } else {
                    setSearchStatus('No Results Found');
                }
            } catch (error) {
                setSearchStatus("Error Occurred");
            }
        };
        fetchData();
        setFilteredResults(results);
    }, [edit,create]);

    if (!isAuthenticated) return null;

    const fetchData = async () => {
        try {
            setSearchStatus('Searching...');
            
            const response = await fetch("https://deals-dray-backend.vercel.app/employees/filter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({filters:filters,search:searchInput.current.value}),
                redirect: 'follow',
            });
            
            
            if (response.ok) {
                const data = await response.json();
                setFilteredResults(data || [])
            } else {
                setSearchStatus('No Results Found');
            }
        } catch (error) {
            setSearchStatus("Error Occurred");
        }
    };


  return (
    <div className="px-32 bg-white min-h-screen flex flex-col gap-10 justify pt-32 items-center">
        <div className='flex flex-row justify-start items-center gap-10 w-full'>
            <input className='p-2 border rounded-md w-1/3' ref={searchInput} type='text' placeholder='Enter search keyword'/>
            <FilterDropdown setFilters={(v)=>setFilters(v)} filters={filters}/>
            <button className='rounded-md bg-[#01008A] px-5 py-2' onClick={fetchData}>Search</button>
            <button className='rounded-md border border-[#01008A] px-5 py-2 text-[#01008A]' onClick={()=>setCreate(true)}>Create new</button>
        </div>
        {create && <div style={style} className='w-full backdrop-blur-lg bg-black bg-opacity-50'>
            <CreateModal setCreate={(value)=>setCreate(value)}/>
        </div>}
        {edit && <div style={style} className='w-full backdrop-blur-lg bg-black bg-opacity-50'>
            <UpdateModal setEdit={(value)=>setEdit(value)} id={id}/>
        </div>}
        <EmployeeTable result={filteredResults} setId={(v)=>setId(v)} setEdit={(v)=>setEdit(v)} edit={edit} create={create}/>
    </div>
  )
}

export default Page