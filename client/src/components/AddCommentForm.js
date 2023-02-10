import {useState} from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

const AddCommentForm = ({articleName, onArticleUpdated}) => {
    const [name, setName] = useState('');
    const [commentText, setCommentText] = useState('');
    const {user} = useUser();

    const addComment = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? {authtoken: token} : {};
        const response = await axios.post(`/api/articles/${articleName}/comments`,{
            postedby: name,
            text: commentText,
        }, {
            headers,
        });
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setName('');
        setCommentText('');
    }

    return (
        <div id="add-comment-form">
            <h3>Agregar un comentario</h3>
            {user && <p>Esta comentando como {user.email}</p>}
            <textarea value={commentText} onChange={e => setCommentText(e.target.value)} rows="4" cols="50"/>
            <button onClick={addComment}>Enviar</button>
        </div>)
}

export default AddCommentForm;