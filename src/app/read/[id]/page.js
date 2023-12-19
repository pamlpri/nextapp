export default async function Read(props) {
    // 파라미터 값을 가져옴
    const id = props.params.id;
    const resp = await fetch(`http:localhost:9999/topics/${id}`);
    const topic = await resp.json();
    return(
        <>
        <h2>{topic.title}</h2>
        <p>{topic.body}</p>
        </>
    )
}