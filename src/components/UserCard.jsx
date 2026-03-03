import React from "react";

export default function UserCard({ user }) {
  if (!user) return null;

  const {
    firstName,
    lastName,
    about,
    skills,
    age,
    gender,
    photoUrl,
  } = user;

  return (
    <div className="card bg-base-100 shadow-md w-full">
      <figure>
        <img
          src={photoUrl || "https://via.placeholder.com/400x300"}
          alt={`${firstName} ${lastName}`}
          className="w-full h-64 object-cover"
        />
      </figure>

      <div className="card-body">
        {/* ✅ Fixed name rendering */}
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>

        {/* ✅ Safer conditional rendering */}
        {age !== undefined && gender && (
          <p className="text-sm opacity-70">
            {age}, {gender}
          </p>
        )}

        {about && <p>{about}</p>}

        {skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="badge badge-outline badge-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}