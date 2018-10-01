import React from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { ButtonOutline } from 'rebass';
import axios from 'axios';

import Button from "Components/CustomButtons/Button.jsx";

/*const divStyle = {
  backgroundColor: 'white',
};*/

export default class Faq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: EditorState.createEmpty(),
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    axios.get(`api/terminos/faq`)
      .then(res => res.data)
      .then(data => {
        const contentBlock = htmlToDraft(data);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          this.setState({ texto: editorState });
        }
      }).catch(console.log);
  }
  onSubmit = (e) => {
    // e.preventDefault();
    const texto = draftToHtml(convertToRaw(this.state.texto.getCurrentContent()));
    axios.post('api/terminos', { faq: texto })
      .then(()=> console.log('modificado'));
  }
  onEditorStateChange(e) {
    this.setState({ texto: e });
  }
  render() {
    return (
      <div>
        <div style={{backgroundColor: 'white'}}>
          <Editor
            editorState={this.state.texto}
            onEditorStateChange={this.onEditorStateChange}
          />
          {/*<ButtonOutline onClick={this.onSubmit}>Modificar</ButtonOutline>*/}
        </div>
          <div style={{marginTop: 50, display: 'flex', justifyContent: 'flex-end'}} onClick={()=> this.onSubmit()}>
            <Button type="submit" color="primary">Enviar</Button>
          </div>
      </div>);
  }
}
