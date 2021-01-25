import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash';
import {GetPokemonList} from "../actions/pokemonActions";
import {Link} from 'react-router-dom';
import ReactPaginate from "react-paginate";


const PokemonList = (props) => {
    const [search, setSearch] = useState(""); 
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.PokemonList);
    React.useEffect( () =>{
        FetchData(1);
    }, []);

    const FetchData = (page=1) => {
        dispatch(GetPokemonList(page));
    }
    
    const ShowData = () => {
        console.log("data", Math.ceil(pokemonList.count/15));

        if(pokemonList.loading){
            return <p>Loading</p>
        }

        else if (!_.isEmpty(pokemonList.data)){
            return pokemonList.data.map(el => {
                return (
                    <div className={"list-wrapper"}>
                        <div className={"pokemon-item"}>
                            <p>{el.name}</p>
                            <Link className to={`/pokemon/${el.name}`}>View</Link>
                        </div>
                    </div>)
            })
        }
        
        
        else if (pokemonList.errorMsg !== ""){
            return <p>{pokemonList.errorMsg}</p>
        }

        return <p>Unable to get data</p>
    }
    
    return(
        <div>
            <div className={"search-wrapper"}>
                <p>Search</p>
                <input type="text" onChange={e => setSearch(e.target.value)}/>
                <button onClick={() => props.history.push(`/pokemon/${search}`)} >Search</button>
            </div>
            {ShowData()}
            {!_.isEmpty(pokemonList.data) && (
                <ReactPaginate
                pageCount={Math.ceil(pokemonList.count/15)}
                pageRangeDisplay={2}
                marginPagesDisplayed={1}
                onPageChange={(data) => FetchData(data.selected + 1)}
                containerClassName = {"pagination"}
                activeClassName={"active"}
                />
                
            )}
        </div>
    )
};

export default PokemonList;