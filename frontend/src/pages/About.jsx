const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          About Me
        </h1>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-600 mb-4">
            I'm a passionate software developer with experience in building modern web
            applications using cutting-edge technologies. I enjoy creating clean, efficient,
            and user-friendly solutions.
          </p>
          <p className="text-gray-600">
            My expertise includes full-stack development, cloud technologies, and DevOps
            practices. I'm always eager to learn new technologies and take on challenging
            projects.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>React</li>
                <li>Vite</li>
                <li>Tailwind CSS</li>
                <li>JavaScript/TypeScript</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Backend</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Spring Boot</li>
                <li>Java</li>
                <li>MySQL</li>
                <li>REST APIs</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">DevOps</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Docker</li>
                <li>Docker Compose</li>
                <li>CI/CD</li>
                <li>Keycloak</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Tools</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Git</li>
                <li>Maven</li>
                <li>npm/yarn</li>
                <li>VS Code</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience</h2>
          <p className="text-gray-600">
            I have experience working on various projects ranging from small applications
            to enterprise-level systems. I'm proficient in agile methodologies and
            collaborative development practices.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About

