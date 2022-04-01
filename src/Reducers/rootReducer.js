import { combineReducers } from "redux";
import CreateProductReducer from "./CreateProductReducer";
import Delreducer from "./Delreducer";
//import GetProductReducer from "./GetProductReducer";
import listReducer from "./listReducer";
//import CreateProductReducer from './CreateProductReducer'
//import DeleteReducer  from './DeleteReducer'
//import PokemonMultipleReducer from "./PokemonMultipleReducer";
const rootReducer = combineReducers({
  List: listReducer,
  DeleteOne:Delreducer,
  CreateProduct:CreateProductReducer
//   Product:GetProductReducer,
//   CreateProduct:CreateProductReducer,
//   DeleteProduct:DeleteReducer
  
});
export default rootReducer;
