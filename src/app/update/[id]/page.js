"use client";

import { useRouter } from "next/navigation";

export default function Update() {
    
    const router = useRouter();
    return(     
        <>
            <h2>Update</h2>
            <form onSubmit={e=>{
                e.preventDefault();
                const title = e.target.title.value;
                const body = e.target.body.value;

                const options = {
                    method: 'POST',
                    headers: { 'Content-Type' : 'application/json' },
                    body: JSON.stringify({title, body})
                }
                fetch(`http://localhost:9999/topics`, options)
                    .then(res=>res.json())
                    .then(result=> {
                        console.log(result);
                        const lastId = result.id;
                        router.push(`/read/${lastId}`) // read 페이지로 이동
                        router.refresh(); // 페이지 새로고침
                    })
            }}>
                <p><input type="text" name="title" /></p>
                <p><textarea name="body" /></p>
                <input type="submit" value="update"/>
            </form>
        </>
    )
}