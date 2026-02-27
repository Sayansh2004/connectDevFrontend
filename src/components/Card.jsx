export default function Card({
  firstName,
  lastName,
  photoUrl,
  age,
  about,
  skills = []
}) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition duration-300">
      
      <figure className="px-6 pt-6">
        <img
          src={photoUrl || "https://via.placeholder.com/150"}
          alt="User"
          className="rounded-2xl h-48 w-48 object-cover border"
        />
      </figure>

      <div className="card-body items-center text-center">

        <h2 className="card-title text-2xl font-bold">
          {firstName} {lastName}
        </h2>

        {age && (
          <p className="text-sm opacity-70">
            Age: {age}
          </p>
        )}

        {about && (
          <p className="mt-3 text-sm text-gray-500">
            {about}
          </p>
        )}

        {/* -------- Skills Section -------- */}
        {skills.length > 0 && (
          <div className="mt-4 w-full">
            <h3 className="font-semibold mb-2">Skills</h3>

            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-primary badge-outline px-3 py-3 text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}