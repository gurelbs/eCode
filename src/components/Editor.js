import React, {useState} from 'react'
import  'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/anyword-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/javascript-hint';
import {Controlled as ControlledEditor} from 'react-codemirror2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';

export default function Editor(props) {

    const {
        language,
        displayName ,
        value,
        onChange
    } = props
    
    const [open, setOpen] = useState(true);
    function handleChange(editor, data, value){
        editor.showHint({ completeSingle: false });
        onChange(value);
    }

    return (
        <div className={`editor-container ${open ? '' : 'collapsed'}`}>
            
            <div className="editor-title">
                {displayName}
                <button
                    type="button"
                    className="expend-collapse-btn"
                    onClick={ () => setOpen(prevOpen => !prevOpen)}
                >
                    <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt}/>
                </button>
            </div>
            <ControlledEditor 
                onBeforeChange={handleChange}
                value={value}
                className="code-mirror-wrapper"
                options={{
                    lineWrapping: true,
                    lint: true,
                    mode: language,
                    theme: 'material',
                    lineNumbers: true,
                    globalVars: true,
                    smartIndent: true,
                    foldGutter: true,
                    autoCloseTags: true,
                    matchBrackets: true,
                    autoCloseBrackets: true,
                    autoRefresh:true,
                    hintOptions: true
                    }}

            />
        </div>
    )
}
