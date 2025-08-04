

import img1 from '../assets/note1.png';
import img2 from '../assets/note2.png';
import img3 from '../assets/note3.png';
import img4 from '../assets/note4.png';


const About = () => {
  //use of usecontext hook 
  
  // useEffect(()=>{
  //   a.updatestate()
  //   // eslint-disable-next-line
  // },[])
  return (
    <div className='wrapper' style={{backgroundColor:"#ABC4E0",width:"100vw", height:"100vh"}}>
      <section class="py-5 px-5 ">
	<div class="container border rounded shadow" style={{backgroundColor:"pink"}} >
		<div class="row gx-4 align-items-center  justify-content-between">
			<div class="col-md-5 order-2 order-md-1">
				<div class="mt-5 mt-md-0">
					
					<h2 class="display-5 fw-bold">About Us</h2>
					<p class="lead">We built iNotebook to restore trust in digital note‑taking. No distractions. No compromise on privacy. Whether it’s for your personal journal, work log, or creative ideas, iNotebook gives you a private space to think clearly.</p>
					<p class="lead">Add, edit, and delete notes on your devices—without ever sacrificing your privacy. iNotebook is built from the ground up to be simple, secure, and completely yours.</p>
				</div>
			</div>
    {/* gx-2 gx-lg-3 */}
			 <div class="col-md-6  offset-md-1 order-1 order-md-2" >  
				<div className='row m-2'>
					{/* <div class="col-6 ">
						<div class="mb-2"><img class=" w-100 h-100 img-fluid rounded-3 object-fit-cover" src={img1}/></div>
					</div>
					 <div class="col-6">
						<div class="mb-2"><img class=" w-100 h-100 img-fluid rounded-3 object-fit-cover" src={img2}/></div>
					</div>
					<div class="col-6">
						<div class="mb-2"><img class=" w-100 h-100 img-fluid rounded-3 object-fit-cover" src={img3}/></div>
					</div> */}
           <div class="col-6">
						<div class="mb-2 p-2"><img class=" w-100 h-100 img-fluid rounded-3 object-fit-cover" style= {{width:"400px",height:"300px"}} src={img2}/></div>
					</div>
					<div class="col-6">
						<div class="mb-2 p-2"><img class=" img-fluid rounded-3 border shadow " style= {{width:"400px",height:"300px"}} src={img4}/></div>
					</div> 
				</div>
			</div>
		</div>
	</div>
</section>
    </div>
  )
}

export default About
