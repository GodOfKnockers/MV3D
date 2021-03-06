import mv3d from "./mv3d";

const {Vector2,Vector3,Color3,Color4} = window.BABYLON;

export const makeColor = color=>{
	if (typeof color === 'number'){
		return {
			r: (color>>16)/255,
			g: (color>>8&255)/255,
			b: (color&255)/255,
			a: 1,
		};
	}else if(color instanceof Color3){
		return color.toColor4();
	}else if(color instanceof Color4){
		return color;
	}else{
		const canvas = document.createElement('canvas');
		canvas.width=1; canvas.height=1;
		const context = canvas.getContext('2d');
		context.fillStyle = color; context.fillRect(0,0,1,1);
		const bytes = context.getImageData(0,0,1,1).data;
		return new Color4(bytes[0]/255,bytes[1]/255,bytes[2]/255,bytes[3]/255);
	}
}


export const hexNumber=n=>{
	n=String(n);
	if(n.startsWith('#')){
		n=n.substr(1);
	}
	return Number.parseInt(n,16);
};

export const relativeNumber=(current,n)=>{
	if(n===''){ return +current; }
	const relative = /^[+]/.test(n);
	if(relative){n=n.substr(1);}
	n=Number(n);
	if(Number.isNaN(n)){ return +current; }
	if(relative){
		return +current+n;
	}else{
		return +n;
	}
};

export const booleanNumber=s=>{
	if(!isNaN(s)){return Number(s);}
	return booleanString(s);
};
export const booleanString=s=>{
	return Boolean(falseString(s));
};
export const falseString=s=>{
	if(!s){ return false; }
	if(typeof s !=='string'){ s=String(s); }
	const S=s.toUpperCase();
	if(falseString.values.includes(S)){
		return false;
	}
	return s;
};
falseString.values=['OFF','FALSE','UNDEFINED','NULL','DISABLE','DISABLED'];

export const sleep=(ms=0)=>new Promise(resolve=>setTimeout(resolve,ms));
export const degtorad=deg=>deg*Math.PI/180;
export const radtodeg=rad=>rad*180/Math.PI;

export const sin=r=>unround(Math.sin(r));
export const cos=r=>unround(Math.cos(r));

export const unround=n=>Math.round(n*1000)/1000;

export const tileSize=()=>tileWidth();
export const tileWidth=()=>Game_Map.prototype.tileWidth();
export const tileHeight=()=>Game_Map.prototype.tileHeight();


// useful consts
export const XAxis = new Vector3(1,0,0);
export const YAxis = new Vector3(0,1,0);
export const ZAxis = new Vector3(0,0,1);
export const v2origin = new Vector2(0,0);
export const v3origin = new Vector3(0,0,0);

export const PI = Math.PI;
export const PI2 = Math.PI*2;

// overloading

export const overload=funcs=>{
	const overloaded = function(){
		const l=arguments.length;
		if(typeof funcs[l] === 'function'){
			return funcs[l].apply(this,arguments);
		}else if(typeof funcs.default === 'function'){
			return funcs.default.apply(this,arguments);
		}else{ console.warn("Unsupported number of arguments."); }
	}
	for(const key in funcs){
		overloaded[key]=funcs[key].bind
	}
	return overloaded;
};

// override
const _override_default_condition=()=>!mv3d.isDisabled();
export const override=(obj,methodName,getNewMethod,condition=_override_default_condition)=>{
	const oldMethod = obj[methodName];
	const newMethod = getNewMethod(oldMethod);
	return obj[methodName] = function(){
		if(!(typeof condition==='function'?condition():condition)){ return oldMethod.apply(this,arguments); }
		return newMethod.apply(this,arguments);
	};
}


//
const util = {
	makeColor,hexNumber,relativeNumber,booleanString,falseString,booleanNumber,
	sleep,degtorad,radtodeg,sin,cos,unround,tileSize,tileWidth,tileHeight,
	XAxis,YAxis,ZAxis,v2origin,v3origin,PI,PI2,
	overload, override
};
export default util;