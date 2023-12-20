"use client";

import { useRouter } from "next/navigation";

export default function Create() {
    /*
        onSubmit{} 작업 과정
        [문제발생] Uncaught Error: Event handlers cannot be passed to Client Component props.
        [해답] client component props로 변경
     */
    const router = useRouter();
    return(     
        <>
            <h2>Create</h2>
            <form onSubmit={e=>{
                e.preventDefault();
                const title = e.target.title.value;
                const body = e.target.body.value;

                const options = {
                    method: 'POST',
                    headers: { 'Content-Type' : 'application/json' },
                    body: JSON.stringify({title, body})
                }
                fetch(`${process.env.NEXT_PUBLIC_API_URI}topics`, options)
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
                <input type="submit" value="create"/>
            </form>
        </>
    )
}