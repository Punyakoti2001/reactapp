import React, { useEffect } from 'react'
import Logo from '../assets/images/hero.avif'

export default function Home() 
{

  useEffect(()=>{
    

  },[])

  return (
    <div>
      <section className='d-flex justify-space-between my-20'>
        <div className='m-auto'>
          <h1>The Ultimate eBook Store </h1>
          <p>CodeBook is the world's most popular and authoritative source for computer science ebooks.
            Find ratings and access to the newest books digitally.</p>
          <button className='btn bg-primary'>Explore eBooks</button>
        </div>
        <div className='mt-5 mx-5'>
          <img src={Logo} className=" rounded-4 " style={{ height: "400px", width: "500px" }} />
        </div>
      </section>

      <section className='mt-5'>
        <div className='mt-5'>
          <h2><u>Featured eBooks</u></h2>
        </div>

        <div className='container'>
          {
            
          }
          <div className='row'>
            <div className='col'>
            <div className="card mt-10 mx-2 shadow-lg" style={{ width: "18rem" }}>
                <img src={Logo} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5>Bangkok</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt at eius
                    doloribus, ullam vel eum iure quam debitis eveniet dolorum sequi, iste
                    nesciunt blanditiis distinctio omnis. Distinctio nobis quos quas?
                  </p>
                  <a className='btn btn-danger'>Click Here</a>
                </div>
              </div>
            </div>

            <div className='col'>
            <div className="card mt-10 mx-2 shadow-lg" style={{ width: "18rem" }}>
                <img src={Logo} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5>Bangkok</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt at eius
                    doloribus, ullam vel eum iure quam debitis eveniet dolorum sequi, iste
                    nesciunt blanditiis distinctio omnis. Distinctio nobis quos quas?
                  </p>
                  <a className='btn btn-danger'>Click Here</a>
                </div>
              </div>
            </div>

            <div className='col'>
            <div className="card mt-10 mx-2 shadow-lg" style={{ width: "18rem" }}>
                <img src={Logo} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5>Bangkok</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt at eius
                    doloribus, ullam vel eum iure quam debitis eveniet dolorum sequi, iste
                    nesciunt blanditiis distinctio omnis. Distinctio nobis quos quas?
                  </p>
                  <a className='btn btn-danger'>Click Here</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='mt-5'>
        <div className='mt-5'>
          <h2><u>Student About CodeBook</u></h2>
        </div>
      </section>

      <section>
        <div className='table-responsive container rounded'>
          <table className='table table-bordered' >
            <tbody>
              <tr>
                <td style={{ width: "50%" }}>
                  <div>
                    <h3>Very easy this was to integrate</h3>
                    <p>If you care for your time, I hands down would go with this.</p>

                    <div className='d-flex justify-content-between align-items-center'>
                      <h1 ></h1>
                      <div className="d-flex align-items-left">
                        <img src={Logo} className="mx-3" style={{ borderRadius: "50%", width: "35px" }} />
                        <h5 className="ml-2">Jese Leos </h5>
                      </div>
                      <p></p>
                    </div>
                    <p >Software Engineer at Randomn</p>


                  </div>
                </td>
                <td style={{ width: "50%" }}>
                  <div>
                    <h3>Solid foundation for any project</h3>
                    <p>Designing with Figma components that can be easily translated to the utility classes of Tailwind CSS is a huge timesaver!"</p>
                    <div className='d-flex justify-content-between align-items-center'>
                      <h1 ></h1>
                      <div className="d-flex align-items-center">
                        <img src={Logo} className="mx-3" style={{ borderRadius: "50%", width: "35px" }} />
                        <h5 className="ml-2">Jese Leos </h5>
                      </div>
                      <p></p>
                    </div>
                    <p style={{ margin: "auto" }}>Software Engineer at Randomn</p>

                  </div>
                </td>
              </tr>

              <tr>

                <td style={{ width: "50%" }}>
                  <div>
                    <h3>Very easy this was to integrate</h3>
                    <p>If you care for your time, I hands down would go with this.</p>

                    <div className='d-flex justify-content-between align-items-center'>
                      <h1 ></h1>
                      <div className="d-flex align-items-left">
                        <img src={Logo} className="mx-3" style={{ borderRadius: "50%", width: "35px" }} />
                        <h5 className="ml-2">Jese Leos </h5>
                      </div>
                      <p></p>
                    </div>
                    <p>Software Engineer at Randomn</p>


                  </div>
                </td>
                <td style={{ width: "50%" }}>
                  <div>
                    <h3>Very easy this was to integrate</h3>
                    <p>If you care for your time, I hands down would go with this.</p>
                    <div className='d-flex justify-content-between align-items-center'>
                      <h1 ></h1>
                      <div className="d-flex align-items-left">
                        <img src={Logo} className="mx-3" style={{ borderRadius: "50%", width: "35px" }} />
                        <h5 className="ml-2">Jese Leos </h5>
                      </div>
                      <p></p>
                    </div>
                    <p>Software Engineer at Randomn</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
