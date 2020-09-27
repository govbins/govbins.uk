import React from 'react'

const Label = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="text-xl block">{children}</label>
  )
}

const TextInput = ({ name }) => {
  return (
    <input type="text" id={name} name={name} className="border-2 border-solid border-black text-xl w-full bg-gray" />
  )
}

const FormGroup = ({ children }) => {
  return (
    <div className="mt-4">
      {children}
    </div>
  )
}

const Upload = () => {
  return (
    <>
      <div className="mx-auto w-full px-4 lg:px-0 lg:w-1/3 mb-20 mt-8 pt-5">
        <h1 className="text-3xl">Send your photos</h1>

        <form action="/confirmation" method="POST" data-netlify="true" name="submission" encType="multipart/form-data">
          <input type="hidden" name="form-name" value="submission" />

          <FormGroup>
            <Label htmlFor="photos">Upload photos</Label>
            <input type="file" id="photos" name="photos" multiple className="text-sm" />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="council">Local council</Label>
            <TextInput name="council" />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email address</Label>
            <TextInput name="email" />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="name">Full name (optional)</Label>
            <TextInput name="name" />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="social">Social media URL</Label>
            <p>We link to this to credit the image to you</p>
            <TextInput name="social" />
          </FormGroup>

          <FormGroup>
            <button type="submit" style={{ background: '#333' }} className="text-xl mt-4 text-white rounded-md p-4 inline-block">
              Send and finish
            </button>
          </FormGroup>
        </form>
      </div>
    </>
  )
}

export default Upload
