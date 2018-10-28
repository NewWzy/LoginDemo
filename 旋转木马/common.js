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
//获取任意一个元素的任意一个样式属性的值
    function getStyle(element,attr){
			return window.getComputedStyle?window.getComputedStyle(element,null)[attr] :element.currentStyle[attr];
		}	
//设置任意的一个元素，移动到指定的目标位置
//匀速动画函数
		function animate(element, target) {
			//先清理定时器
			clearInterval(element.timeId);
			element.timeId = setInterval(function() {
				//获取当前div的位置
				var current = element.offsetLeft;
				//div每次移动多少像素--步数
				var step = 9;
				step = current < target ? step : -step;
				//每次移动后的距离
				current += step;
				//判断当前移动后的位置是否到达目标位置
				if (Math.abs(target - current) > Math.abs(step)) {
					element.style.left = current + "px";
				} else {
					//清理定时器
					clearInterval(element.timeId);
					element.style.left = target + "px";
				}
			}, 20);
		}
//变速动画函数
		//设置任意的一个元素，移动到指定的目标位置
		function animate1(element, target) {
			//先清理定时器
			clearInterval(element.timeId);
			element.timeId = setInterval(function() {
				//获取当前div的位置
				var current = element.offsetLeft;
				// console.log(current);
				//div每次移动多少像素--步数
				var step = (target-current)/10;
				step = step>0?Math.ceil(step):Math.floor(step);
				//每次移动后的距离
				current += step;
				element.style.left=current+"px";
				if(current==target){
					clearInterval(element.timeId);
				}
				//测试代码
				console.log("目标位置："+target+"当前位置："+current+"移动步数："+step);
			}, 20);
		}
function animate2(element, attr,target) {
			//先清理定时器
			clearInterval(element.timeId);
			element.timeId = setInterval(function() {
				//获取当前div的位置
				var current = parseInt(getStyle(element, attr));
				// console.log(current);
				//div每次移动多少像素--步数
				var step = (target-current)/10;
				step = step>0?Math.ceil(step):Math.floor(step);
				//每次移动后的距离
				current += step;
				element.style[attr]=current+"px";
				if(current==target){
					clearInterval(element.timeId);
				}
				//测试代码
				console.log("目标位置："+target+"当前位置："+current+"移动步数："+step);
			}, 20);
		}
//变速动画函数，改变任意多个属性的值
		function animate4(element, json, fn) {
			//先清理定时器
			clearInterval(element.timeId);
			element.timeId = setInterval(function() {
				var flag = true; //假设全部到达目标位置
				for (var attr in json) {
					//判断这个属性attr中是不是opacity
					if (attr == "opacity") {
						//获取元素当前的透明度，并且透明度放大100倍
						var current = getStyle(element, attr)*100;
						//目标透明度放大100倍
						var target = json[attr]*100;
						var step = (target - current) / 10;
						step = step > 0 ? Math.ceil(step) : Math.floor(step);
						//每次移动后的值
						current += step;
						element.style[attr] = current/100;
					} else if (attr == "zIndex") { //判断这个属性attr中是不是zIndex
						element.style[attr]=json[attr];
					} else { //普通属性
						//获取元素这个属性当前的值
						var current = parseInt(getStyle(element, attr));
						//当前属性对应的目标值
						var target = json[attr];
						//div每次移动的步数
						var step = (target - current) / 10;
						step = step > 0 ? Math.ceil(step) : Math.floor(step);
						//每次移动后的值
						current += step;
						element.style[attr] = current + "px";
					}
					if (current != target) {
						flag = false;
					}
				}
				if (flag) {
					clearInterval(element.timeId);
					if (fn) {
						fn();
					}
				}
				//测试代码
				console.log("目标位置：" + target + "当前位置：" + current + "移动步数：" + step);
			}, 20);
		}
//获取浏览器向上卷曲出去的距离的值，向左卷曲出去的值
	function getScroll(){
		return {
		left: window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,
		top: window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0
	  };
	}
