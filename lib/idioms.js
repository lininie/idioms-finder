import {filter, each} from 'lodash'

export function search(idiom, idiomDictionary){

	  let toSearch = '';

  	//
    if(idiom == null || idiom == ''){
      toSearch = 'null';
    }
    else{
      toSearch = '^[^x00-xff]*' + idiom + '[^x00-xff]*$';
    }
    //if(idiom != null && idiom != 0){
  	// toSearch = '^[^x00-xff]*' + idiom + '[^x00-xff]*$';
    //}

  	if (idiom.indexOf('_') >= 0) {
    	toSearch = toSearch.replace(/\_/g, '[^x00-xff]');
  	}
  	if (idiom.indexOf('/') >= 0) {
    	toSearch = idiom.replace(/\//g, '');
  	}

    const result = filter(idiomDictionary, w => {
    return w.match(new RegExp(toSearch,'g'));
    });

    return {
      result,
      searchPattern: toSearch
    };
    
}