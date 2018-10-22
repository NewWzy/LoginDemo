/**
 *@author:Wzy
 *@date:
 *@describe:
 *@version:
 */
function my$(id){
	return document.getElementById(id);
}
//获取任意一个父级元素的第一个子元素
		function getFirstElementChild(element){
			if(element.firstElementChild){//true-----支持
				return element.firstElementChild;
			}else{
				var node=element.firstChild;
				while(node&&node.nodeType!=1){
					node=node.nextSibling;
				}
				return node;
			}
		}
//获取任意一个父级元素的最后一个子元素
		function getLastElementChild(element){
			if(element.lastElementChild){//true-----支持
				return element.lastElementChild;
			}else{
				var node=element.lastChild;
				while(node&&node.nodeType!=1){
					node=node.previousSibling;
				}
				return node;
			}
		}
//为任意元素.绑定任意的事件，任意的元素，事件的类型，事件处理函数
		function addEventListener(element,type,fn){
			//判断浏览器是否支持这种方法
			if(element.addEventListener){
				element.addEventListener(type,fn,false);
			}else if(element.attacheEvent){
				element.attacheEvent("on"+type,fn);
			}else{
				element["on"+type]=fn;
			}
		}	
//为任意一个元素，解绑对应的事件
		function removeEventListener(element,type,fnName){
			if(element.removeEventListener){
				element.removeEventListener(type,fnName,false);
			}else if(element.detachEvent){
				element.detachEvent("on"+type,fnName);
			}else{
				element["on"+type]=null;
			}
		}	
//设置标签中的文本内容，应该使用textContent属性，谷歌，火狐支持，IE8不支持
//设置标签中的文本内容，应该使用innerText属性，谷歌，火狐,IE8都支持
//如果这个属性在浏览器中不支持，那么这个属性类型是undefined
//设置任意的标签中间的任意文本内容
        function setInnerText(element,text){
        	//判断浏览器是否支持这个属性
        	if(typeof element.textContent=="undefined"){//不支持
        		element.innerText=text;
        	}else{//支持这个属性
        		element.textContent=text;
        	}
        }
//获取任意标签中间的文本内容
         function getTnnerText(element){
         	if(typeof element.textContent=="undefined"){
         		return element.innerText;
         	}else{
         		return element.textContent;
         	}
         }