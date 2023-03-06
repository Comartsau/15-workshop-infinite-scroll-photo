
import PhotoComponent from './components/PhotoComponent'
import './App.css'
import { useEffect,useState } from 'react'

function App() {
  const apikey = `XR2sVRhk2pq7zhOIbk81rGjr93D4MjHc_jlLlSVfoLk`
  const [photos,setPhotos] = useState([])
  const [page,setpage] = useState(1)
  const [isLoading,setIsLoading] = useState(false)
  
  const fetchImage = async () => {
    setIsLoading(true)
    try {
      const apiurl = `https://api.unsplash.com/photos/?client_id=${apikey}&page=${page}`
      const response = await fetch(apiurl)
      const data = await response.json()
      setPhotos((oldData) => {
        return [...oldData,...data]
      })
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    fetchImage()
  },[page])

  useEffect(() =>{
   const event = window.addEventListener('scroll',()=> {
      if(window.innerHeight+window.scrollY > document.body.offsetHeight-500 && !isLoading) {
        setpage((oldpage)=>{
          return oldpage+1
        })

      }
    })
    return () =>window.removeEventListener('scroll',event)
  },[])
    console.log(page)
  return (
    <main>
      <h1>Infinite Scroll Photo | Unsplash API</h1>
     <section className='photos'>
        <div className='display-photo'>
          {photos.map((data,index) => {
            return <PhotoComponent key={index} {...data} />
          })}

        </div>
     </section>

    </main>
  )
}

export default App
