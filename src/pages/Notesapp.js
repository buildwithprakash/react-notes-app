import React ,{useEffect, useState}from 'react'
import '../Notesapp.css';
function Notesapp() {
const [notes,setNotes]=useState([]);
const [title,setTitle]=useState('');
const [content,setContent]=useState('');
const [editNotedId,setEditNoteId]=useState('');
const[editTitle,setEditTitle]=useState('');
const [editContent,setEditContent]=useState('');


const fetchNotes=async ()=>{
    const user=JSON.parse(localStorage.getItem("user"));
   
   if(!user || !user.id){
    console.log("User not logged in.");
    return;
   }
    try {
        const response=await fetch(`http://localhost:4798/api/notes?userId=${user.id}`);
        const data=await response.json();
        setNotes(data);
    } catch (error) {
        console.log("error fetching notes:",error);
    }
};

const addNote=async(e)=>{
    e.preventDefault();
    if(!title.trim() || !content.trim()){
        alert("Title and Content are required");
        return;
    }

const user=JSON.parse(localStorage.getItem("user"));
if(!user || !user.id)
{
    alert("User not Logged in");
    return;
}
const newNOte={title,content,
    user:{id:user.id}
};

try {
    const response=await fetch("http://localhost:4798/api/notes",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(newNOte)
    }
    
    );

    if(!response.ok) throw new Error("Error adding note");

    const savedNote=await response.json();
    setNotes([savedNote,...notes]);
    setTitle('');
    setContent('');
} catch (error) {
    console.error("Error adding note:",error);
}
};

const deleteNote=async(id)=>{
    try {
        await fetch(`http://localhost:4798/api/notes/${id}`,{
            method:"DELETE"
        });
        setNotes(notes.filter(note=>note.id!==id));
    } catch (error) {
        console.log("Error deleting note:",error);
    }
};

useEffect(()=>{
    fetchNotes();
},[]);


const StartEdit=(note)=>{
    setEditNoteId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
};

const cancelEdit=()=>{
    setEditNoteId(null);
    setEditTitle('');
    setEditContent('');
};

const saveEdit=async(id)=>{
    const updatedNote={title:editTitle,content:editContent};

    try {
        const response= await fetch(`http://localhost:4798/api/notes/${id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(updatedNote)
        });
        if(!response.ok) throw new Error("Failed to update");
        const updated= await response.json();
        setNotes(notes.map(note =>(note.id===id?updated:note)));
        cancelEdit();
    } catch (error) {
        console.error("Error updating notes :",error);
    }
}
  return (
    <div className='note-container'>
        <h2>Add Note</h2>
      <form onSubmit={addNote} className='note-form'>
        <input type='text' placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)} />
        <input type='text' placeholder='Content' value={content} onChange={e=>setContent(e.target.value)} />
        <button type='submit'>Add</button>
      </form>
{
    notes.length===0?(
        <p>No notes available</p>
    ):(
        
        notes.map(note=>(
            <div key={note.id} className='note-card'>
                {editNotedId===note.id?(
                    <>
                    <input type='text' value={editTitle} onChange={e=>setEditTitle(e.target.value)} />
                    <br/ >
                    <input type='text' value={editContent} onChange={e=>setEditContent(e.target.value)} />
                    <br />
                    <button onClick={()=>saveEdit(note.id)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                    </>):(

                    <>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={()=>deleteNote(note.id)}>Delete</button>
            <button onClick={()=>StartEdit(note)}>Edit</button>
            </>
        )
}
    </div>
        ))
    )}
    </div>
  )
}

export default Notesapp
