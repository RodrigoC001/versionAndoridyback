import React from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { ButtonOutline } from 'rebass';
import axios from 'axios';

import Button from "Components/CustomButtons/Button.jsx";



// Alert components
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "Components/Snackbar/Snackbar.jsx"


/*const divStyle = {
  backgroundColor: 'white',
};*/

export default class TerminosContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      texto: EditorState.createEmpty(),
      openSuccess: false,
      openFailure: false,
    };
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    axios.get(`api/terminos/termsAndPrivacy`)
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
    axios.post('api/terminos', { termsAndPrivacy: texto })
      .then(()=> this.showNotificationSuccess())
      .catch(()=> this.showNotificationFailure())
  }
  showNotificationSuccess = () => {
    this.setState({
      openSuccess: true, 
      address: '',
    });
    setTimeout(function(){
            this.setState({openSuccess: false})
        }.bind(this),1000);
  }
  showNotificationFailure = () => {
    this.setState({
      openFailure: true, 
      // address: '',
    });
    setTimeout(function(){
            this.setState({openFailure: false});
        }.bind(this),6000);
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
        <div>
          <Snackbar
            place="bc"
            color="success"
            icon={AddAlert}
            message="Privacidad y Terminos modificado!"
            open={this.state.openSuccess}
            closeNotification={() => this.setState({openSuccess:false})}
            close
          />
        </div>
        <div>
          <Snackbar
            place="bc"
            color="danger"
            icon={AddAlert}
            message="Error, verifica que todos los campos esten completos"
            open={this.state.openFailure}
            closeNotification={() => this.setState({openFailure:false})}
            close
          />
        </div>
      </div>);
  }
}
