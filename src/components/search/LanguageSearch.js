import React, {useState} from 'react'
import PropTypes from 'prop-types'

function Languagesearch(props) {
    let [langCheck, setLangCheck] = useState('');
    const [langList,setlangList] = useState([]);

    const onChangeLang = (e) => {
        langCheck = e.target.name;
        setLangCheck(langCheck)
        console.log(langCheck)
        // if(e.target.checked) {
        //     langCheck = e.target.name;
        //     console.log(langCheck)
        // } else  {
        //     console.log('Choose a lang')
        // }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.searchLanguage(langCheck);
        setLangCheck('')

    }

    
    // const addToList = (e) => {
    //     langList.forEach(x => {
    //         langList.push(e.target.name);             
    //     });
    //     langList.splice(', ')

    // }

 
    return (
    <div className="text-center">
        <form onSubmit={onSubmit}> 
            <h3 style={{marginBottom: '1rem'}}>Välj språk</h3>
            <div style={boxStyle}>
                <label htmlFor="javascript">JavaScript: 
                    <input className="cbox" type="checkbox" value={langList.name} onChange={onChangeLang} name="javascript" id="js"/>
                    <input type="submit" value=""/>
                </label>
                <label htmlFor="c#">C#: 
                    <input className="cbox" type="checkbox" value={langList} onChange={onChangeLang} name="c#" id="csharp"/>
                </label>
                <label htmlFor="java">Java: 
                    <input className="cbox" type="checkbox" value={langList} onChange={onChangeLang} name="java" id="java"/>
                </label>
                <label htmlFor="kotlin">Kotlin: 
                    <input className="cbox" type="checkbox" value={langCheck} onChange={onChangeLang} name="kotlin" id="kotlin"/>
                </label>
            </div>
        </form>
    </div>
    )
}

const boxStyle = {
    width: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    margin: 'auto'
}

Languagesearch.propTypes = {

}

export default Languagesearch

