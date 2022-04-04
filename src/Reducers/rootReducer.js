
import { combineReducers } from "redux";
import { EditProduct } from "../actions/ProductActions";
import CreateProductReducer from "./CreateProductReducer";
import Delreducer from "./Delreducer";
import EditProductReducer from "./EditProductReducer";
//import GetProductReducer from "./GetProductReducer";
import listReducer from "./listReducer";
import SearchCatReducer from "./SearchCatReducer";
import SearchIdReducer from "./SearchIdReducer";
//import CreateProductReducer from './CreateProductReducer'
//import DeleteReducer  from './DeleteReducer'
//import PokemonMultipleReducer from "./PokemonMultipleReducer";
const rootReducer = combineReducers({
  List: listReducer,
  DeleteOne:Delreducer,
  CreateProduct:CreateProductReducer,
  EditProduct: EditProductReducer,
  SearchCat:SearchCatReducer,
  SearchId1: SearchIdReducer
//   Product:GetProductReducer,
//   CreateProduct:CreateProductReducer,
//   DeleteProduct:DeleteReducer
  
});
export default rootReducer;
