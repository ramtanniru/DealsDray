import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const columns = [
    { id: 'id', label: 'ID' },
    { id: 'image', label: 'Image', minWidth: 100 },
    {
      id: 'name',
      label: 'Name',
      minWidth: 170,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'email',
      label: 'Email',
      minWidth: 170,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'mobile',
      label: 'Mobile No',
      minWidth: 170,
      align: 'left',
    },
    {
        id: 'designation',
        label: 'Designation',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'gender',
        label: 'Gender',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'course',
        label: 'Course',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'createDate',
        label: 'Create date',
        minWidth: 170,
        align: 'left',
        format: (value) => {
            const date = new Date(value);
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        },
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
        align: 'left'
    }
];

export default function EmployeeTable({ result, setId, setEdit, edit, create}) {
  const [page, setPage] =useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [table,setTable] = useState(result);
  useEffect(()=>{
    setTable(result);
  },[result]);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (id) => {
    setId(id);
    setEdit(true);
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
  
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`https://deals-dray-backend.vercel.app/employees/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert('Item deleted successfully');
        // You can also trigger a state update or re-fetch the data to update the UI
      } else {
        alert('Failed to delete the item');
      }
    } catch (error) {
      alert('An error occurred while deleting the item');
      console.error('Delete error:', error);
    }
  };
  

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: "#01008A", color: '#ffffff', fontWeight: "bold",}}
                  className='bg-[#01008A] text-white font-bold'
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {table
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      if (column.id==='image'){
                        return <TableCell key={column.id} align={column.align}>
                            <Image src={row.image} height={50} width={50} alt='image'/>
                        </TableCell>;
                      }
                      else if (column.id==='action'){
                        return <TableCell align="left" key={column.id}>
                            <div className='flex flex-row gap-3 justify-between items-center p-3'>
                                <button className="bg-blue-500 text-white px-3 py-1 rounded-md" onClick={()=>handleEdit(row.id)}>
                                Edit
                                </button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded-md" onClick={()=>handleDelete(row.id)}>
                                Delete
                                </button>
                            </div>
                        </TableCell>;
                      }
                      else if (column.id==='course'){
                        return <TableCell align="left" key={column.id}>
                            <div className='flex flex-wrap gap-3 justify-start items-start'>
                                {row.courses.map((item,id)=><p className='text-black' key={id}>{item}</p>)}
                            </div>
                        </TableCell>;
                      }
                      else{
                        return <TableCell key={column.id} align={column.align} className='text-black text-md'>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                            : (column.id!=='createDate' && value)}
                            {column.id==='createDate' && column.format(value)}
                        </TableCell>;
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={result.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
