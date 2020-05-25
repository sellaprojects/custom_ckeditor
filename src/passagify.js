import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import passageIcon from '@ckeditor/ckeditor5-core/theme/icons/passage.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
export default class Passagify extends Plugin {
    init() {
        const editor = this.editor;
        editor.ui.componentFactory.add( 'passagify', locale => {
            const view = new ButtonView( locale );

            view.set( {
                label: 'Passagify',
                icon: passageIcon,
                tooltip: true
            } );

            // Callback executed once the image is clicked.
            view.on( 'execute', () => {
               const tableWidth = prompt( 'Passage width' );
               let intTableWidth;
                try{
                    intTableWidth=Number.parseInt(tableWidth);
                    if(Number.isNaN(intTableWidth)) throw "Not a Number error";
                    editor.model.change( writer => {
                         const selection=editor.model.getSelectedContent(editor.model.document.selection);
                         let selectedText= "";
                         for(let i=0; i<selection._children.length; i++){
                             const node=selection._children._nodes[i]
                             if(node.name==="paragraph"){
                                selectedText=selectedText+node._children._nodes[0]._data+" ";
                             }else if(selection._children.length===1 && node._data){
                                selectedText= node._data+" ";
                                
                             }
                             
                         }

                         console.log(editor);             
                         editor.model.deleteContent(editor.model.document.selection);
                    });
                }catch(err){
                    console.log(err);
                }
               
               
            } );

            return view;
        } );
    }
}