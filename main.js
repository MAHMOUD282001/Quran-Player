let audio = document.querySelector('.quranPlayer'),
    surahsContainer = document.querySelector('.surahs'),
    ayah = document.querySelector('.ayah'),
    next = document.querySelector('.next'),
    play = document.querySelector('.play'),
    prev = document.querySelector('.prev');
    
    
    getSurahs()
    function getSurahs(){
        fetch("https://quran-endpoint.vercel.app/quran")
        .then(res => res.json())
        .then(data => {
            for(let surah in data.data){
                
                surahsContainer.innerHTML += 
                `<div>
                    <p>${data.data[surah].asma.ar.long}</p>
                    <p>${data.data[surah].asma.en.long}</p>
                </div>`
                
                // console.log(data.data[surah].name)
            }
            
            
            let allSurahs = document.querySelectorAll(".surahs div"),
                ayahAudios,
                ayahText;
            
            allSurahs.forEach((surah, index) =>{
                surah.addEventListener("click", ()=>{
                    fetch(`https://quran-endpoint.vercel.app/quran/${index+1}`)
                    .then(res => res.json())
                    .then(data => {
                        let ayahs = data.data.ayahs;
                        ayahAudios = []
                        ayahText = []
                        
                        ayahs.forEach(aya =>{                            
                            ayahAudios.push(aya.audio.url);
                            ayahText.push(aya.text.ar)
                        })
                        
                        let ayahIndex = 0;
                        
                        changeAyah(ayahIndex)
                        
                        audio.addEventListener("ended", ()=>{
                            ayahIndex ++;
                            
                            if(ayahIndex < ayahAudios.length){
                                
                                changeAyah(ayahIndex)
                                
                            }
                            
                            else{
                                ayahIndex = 0;
                                changeAyah(ayahIndex);
                                audio.pause()
                                
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Your work has been saved',
                                    showConfirmButton: false,
                                    timer: 1500
                                  })
                                  isPlaying = true;
                                  togglePlay();
                            }
                            
                            })
                            
                            
                            next.addEventListener("click", ()=>{
                                if(ayahIndex < ayahAudios.length-1){
                                    ayahIndex++;
                                }
                                else{
                                    ayahIndex = 0
                                }
                                
                                changeAyah(ayahIndex)
                            })
                            
                            prev.addEventListener("click", ()=>{
                                if(ayahIndex == 0 ){
                                    ayahIndex = ayahAudios.length-1;
                                }
                                else{
                                    ayahIndex--
                                }
                                
                                changeAyah(ayahIndex)
                            })
                            
                            let isPlaying = false;
                            togglePlay()
                            
                            function togglePlay(){
                                if(isPlaying){
                                    audio.pause();
                                    play.innerHTML = `<i class="fas fa-play"></i>`;
                                    isPlaying = false;
                                }
                                else{
                                    audio.play();
                                    play.innerHTML = `<i class="fas fa-pause"></i>`;
                                    isPlaying = true;
                                }
                            }
                        
                            play.addEventListener("click", togglePlay)
                            
                            function changeAyah(index) {
                                audio.src = ayahAudios[index]
                                
                                ayah.innerHTML = ayahText[index]
                                
                                audio.play()
                            }
                        
                    
                })
            })
            
        })
    })
}
    
    