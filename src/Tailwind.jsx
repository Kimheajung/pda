function Tailwind() {

    return (
        <div className="grid">
            {/* #### 1. rem , px */}
            {/* w-4 = 1rem = 16px 이건 가변적이다(변하기쉬운) */}
            <div className="w-4">
                w-4
            </div>
            {/* w-[20px] = 20px 로 변하지 않는다 (브라우저 설정과 관계없이) */}
            <div className="w-[20px]"> 
                w-[20px]
            </div>

            {/* #### 2. bg , border-color , rounded */}
            {/* bg : background 컬러 , border-8 : border 1px solid 와 같은 , rounded : radius 와 같은 */}
            <div className="bg-pink-400 w-64 h-64 border-8 border-black rounded-2xl">
            </div>
             <div className="bg-pink-400 w-64 h-64 border-8 border-black rounded-full">
            </div>

            {/* #### 3. w,h,p,m */}
            {/* w : 넓이 h : 높이 p : padding  m: margin / mx : x축 margin , my : y축 margin / px : x축 padding , py : y축 padding */}
            {/* w-200 과 같이 없는 속성들은 w-[200px] 형태로 주면 된다 */}
            <div className="w-64 h-64 bg-pink-300 w-[350px] h-[350px] p-4 p-[20px] m-4 m-[20px]">11</div>
            <div className="w-64 h-64 bg-pink-300 mx-10 my-10">11</div>

            {/* #### 4. text-color , text-size , font-bold , cursor */}
            <div className="w-64 h-64 bg-black text-pink-400 text-[35px] font-[600] cursor-pointer">12</div>

            {/* #### 5. flex , flex-col , justify , items , gap */}
            {/* items-center : y축에 대한 가운데 정렬  */}
            {/* justifty-center : x축에 대한 정렬을 하고 싶을때  */}
            <div className="w-64 h-64 bg-amber-300 text-[50px] text-black flex justify-center items-center my-[20px]">111</div>
            {/* flex 나란히 정렬 , flex-col : col 형태 아래로 떨구고 싶을때 flex-row : 나란히 놔두고 싶을때 */}
            <div className="w-[750px] h-[750px] bg-black flex flex-col justify-center items-center gap-4">
                <div className="flex w-64 h-64 bg-amber-300 text-[50px] text-black justify-center items-center ">111</div>
                <div className="flex w-64 h-64 bg-amber-300 text-[50px] text-black justify-center items-center ">222</div>
            </div>

            {/* hover : 마우스오버할때의 변화감지 , transition : 자연스럽게 변화 감지하게 해주는 기능 */}
            <div className="w-[750px] h-[750px] bg-black flex justify-center items-center gap-4 my-20">
                <div className="hover:bg-purple-700 transition flex w-64 h-64 bg-amber-300 text-[50px] text-black justify-center items-center ">111</div>
                <div className="hover:text-white! transition-colors duration-75 flex w-64 h-64 bg-amber-300 text-[50px] text-black justify-center items-center ">222</div>
            </div>

            {/* 픽토그램 - 신호등+횡당보도 */}
            {/* group : 하위속성에게 css 요소를 줄수있음 지금 같은 경우 부모div에 group 설정 후 자식 쪽에 group-hover로 준것을 볼 수 있음 */}
            <div className='bg-neutral-700 flex flex-row justify-between items-center h-[250px] w-full group'>
                <div className="flex flex-row gap-4 mx-3 group-hover:bg-yellow-400">
                    <div className="w-4 h-[200px] bg-white"></div>
                    <div className="w-4 h-[200px] bg-white"></div>
                    <div className="w-4 h-[200px] bg-white"></div>
                    <div className="w-4 h-[200px] bg-white"></div>
                    <div className="w-4 h-[200px] bg-white"></div>
                </div>
                <div className="flex flex-row justify-center items-center gap-3">
                    <div className="w-32 h-32 bg-red-500 rounded-full border-2 border-black hover:bg-red-300 transition"></div>
                    <div className="w-32 h-32 bg-yellow-500 rounded-full border-2 border-black hover:bg-yellow-300 transition"></div>
                    <div className="w-32 h-32 bg-green-500 rounded-full border-2 border-black hover:bg-green-300 transition"></div>
                </div>
                   <div className="flex flex-row gap-4 mx-3 group-hover:bg-yellow-400">
                    <div className="w-4 h-[200px] bg-white"></div>
                    <div className="w-4 h-[200px] bg-white"></div>
                    <div className="w-4 h-[200px] bg-white"></div>
                    <div className="w-4 h-[200px] bg-white"></div>
                    <div className="w-4 h-[200px] bg-white"></div>
                </div>
            </div>
        </div>
  )
}

export default Tailwind
