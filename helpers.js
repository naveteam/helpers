export const scrollToItem = (id, duration) => {
    const element = document.scrollingElement || document.documentElement;
    const destination = document.getElementById(id);
    const destinationOffset = destination.getBoundingClientRect().top - 115;
    
    let start = element.scrollTop,
        change = destinationOffset,
        currentTime = 0,
        increment = 20;
        
    let animateScroll = () => {        
        currentTime += increment;
        const val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

Math.easeInOutQuad = (t, b, c, d) => {
  t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

export const validateCpf =  (cpf) => {
    cpf = cpf.replace(/\./g, '');
    cpf = cpf.replace(/\-/g, '');
  
    let Residue;
    let Sum;
        Sum = 0;
    if (cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999") return false;
  
    for (let i = 1; i <= 9; i++){
      Sum = Sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
  
    Residue = (Sum * 10) % 11;
    if ((Residue == 10) || (Residue == 11))  Residue = 0;
    if (Residue != parseInt(cpf.substring(9, 10)) ) return false;
    Sum = 0;
    for (let i = 1; i <= 10; i++){
      Sum = Sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
    Residue = (Sum * 10) % 11;
  
    if ((Residue == 10) || (Residue == 11))  Residue = 0;
    if (Residue != parseInt(cpf.substring(10, 11) ) ) return false;
  
    return true;
}

export const groupBy = (xs, f) => {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), []);
}

export const getUrlParams = ( prop ) => {
    let params = {};
    if (!process.browser) return;
    const search = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
    const definitions = search.split( '&' );
  
    definitions.forEach( function( val, key ) {
        var parts = val.split( '=', 2 );
        params[ parts[ 0 ] ] = parts[ 1 ];
    } );
  
    return ( prop && prop in params ) ? params[ prop ] : params;
}

export const hex2rgba = (hex, opacity) => {
    const hexa = hex.replace('#','');
    const r = parseInt(hexa.substring(0, hexa.length/3), 16);
    const g = parseInt(hexa.substring(hexa.length/3, 2*hexa.length/3), 16);
    const b = parseInt(hexa.substring(2*hexa.length/3, 3*hexa.length/3), 16);
    return `rgba(${r},${g},${b}, ${opacity/100})`;
}
