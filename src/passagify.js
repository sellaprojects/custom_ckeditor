import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import passageIcon from '@ckeditor/ckeditor5-core/theme/icons/passage.svg';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TableUtils from '@ckeditor/ckeditor5-table/src/tableutils'
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

                        const tableUtils=new TableUtils();
                        const charsPerRow = Math.floor(intTableWidth*60 / 300); 
                        const rowsNum=Math.ceil(selectedText.length/charsPerRow);
                        console.log("table width : " + intTableWidth);
                        console.log("CharsPerRow: "+ charsPerRow);
                        console.log("rowsNum: "+ rowsNum);
                        
                        
                        
                        let start=0;

                        const table=tableUtils.createTable(writer,rowsNum,2);
                        const firstCell1=table.getChild(0).getChild(0).getChild(0);
                        const firstCell2=table.getChild(0).getChild(1).getChild(0);
                        writer.insertText('line',firstCell1,0);
                        writer.insertText(selectedText.substr(start,charsPerRow),firstCell2,0);
                        
                        for(let i=1;i<rowsNum;i++){
                            start=start+charsPerRow;
                            console.log("start: "+ start);
                            
                            const cell1 = table.getChild(i).getChild(0).getChild(0);
                            const cell2 = table.getChild(i).getChild(1).getChild(0);
                            const text=selectedText.substr(start,charsPerRow)
                            if((i+1)%5 === 0) {
                                writer.insertText((i+1)+"",cell1,0);
                                writer.createSelection(cell1,0)
                                editor.execute( 'fontSize', { value: 'tiny' } );
                            }
                            
                            console.log("INSERTING TEXT "+ text);
                            
                            writer.insertText(text,cell2,0);
                            
                            
                        }
                        console.log("setting the table");
                        console.log(table);
                        
                        editor.model.insertContent(table);
                    });
                }catch(err){
                    console.log(err);
                }
               
               
            } );

            return view;
        } );
    }
}