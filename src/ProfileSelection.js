import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileSelection.css';

function ProfileSelection({ setUserProfile }) {
  const navigate = useNavigate();

  const profiles = [
    { 
      name: "Lobotomy Kaisen", 
      image: "https://scontent.fcrk1-4.fna.fbcdn.net/v/t39.30808-6/641288500_3142572255926106_910127488678385291_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeFt2bDaVBfLLSHh06sRQC5QEeyPn3P4P7oR7I-fc_g_uu2WLpEmD3uv0auohMoSZE_FLR_7zxCGyPdMpRcGt8rs&_nc_ohc=DHxHFXnEpbQQ7kNvwEOQ3RU&_nc_oc=AdrqxTB6eqvKebXMwtCZ4jB2iLXoiSbcSidDD5W6o81BWZQTMhEFtZjDIg3L_UaQ8Bw&_nc_zt=23&_nc_ht=scontent.fcrk1-4.fna&_nc_gid=MkC1wkhXMDQ57B7kIlmJfw&_nc_ss=7a3a8&oh=00_Af3z6_L2BEF5dVj-l3mi3L82qd4jFTF49aTV5wcBk-QrdQ&oe=69D9C937" 
    },
    { 
      name: "Pastor Dela Cruz", 
      image: "https://scontent.fcrk1-5.fna.fbcdn.net/v/t39.30808-6/426600887_1538732880224119_4067553263652852005_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeFw6z2qrJIZl26Gr2mYmporXh31F5XMvXleHfUXlcy9efqSpK7H1NKn0hBN-7aQd85Cu7N8cOptkX2GcBrxOGJP&_nc_ohc=azTgTN0mogAQ7kNvwF1no1Y&_nc_oc=AdqCDmeF6lVtRxtdbHvXMUe_abQOjr-PYcBEchwGCwKazTeIxL7h4rweVuL15qvAO0E&_nc_zt=23&_nc_ht=scontent.fcrk1-5.fna&_nc_gid=yjLOI6O3r8PKTbIrZ3XMdw&_nc_ss=7a3a8&oh=00_Af1So99upOSIQx6y5KIUhDnJAujiAnGs1lnaIPsDC8JKOQ&oe=69D9C24B" 
    },
    { 
      name: "ShotoSCPF", 
      image: "https://scontent.fcrk1-5.fna.fbcdn.net/v/t39.30808-6/476304542_1686590325534981_4508915496204990846_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeHo5b26wcWQd4tRQKUPTp9SsNeTm3v9Lo2w15Obe_0ujYai-ppA-GZVUZjtQLkxe9tMHwQVZGYHu1WzeQxGezoE&_nc_ohc=hLVAksUG_HgQ7kNvwGN4vqw&_nc_oc=AdoZ3LzVxbw5KcEDCIda2exYPIxCGfxTziPySBqBO728oHHiNCVCAj3tDjNSN9PVq1I&_nc_zt=23&_nc_ht=scontent.fcrk1-5.fna&_nc_gid=APQlCABGhkqJ4xi1fr8rUg&_nc_ss=7a3a8&oh=00_Af3HQ_6daMqs-19uwwFnZPiqClRwYwcH_c8686aOZKaPvg&oe=69D9BFC0" 
    },
    { 
      name: "Llante", 
      image: "https://scontent.fcrk1-5.fna.fbcdn.net/v/t39.30808-6/644292700_25949862681333683_927943070445735112_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeHBRZp7r8FmSnn82x8_CCmiKYq7l64QNBkpiruXrhA0GbjrRTH6lNyBlwbn7Xet50NS-PLhd-oQJAVNJRdF9z7Q&_nc_ohc=sDIGmwZWZ0kQ7kNvwHRclBg&_nc_oc=Ado7iqmNcaIPDgs08GFeAKn7ycFltJ_b5jL6NLiVmeTaW8MAsG1-IUTM_jYHoVE_Li4&_nc_zt=23&_nc_ht=scontent.fcrk1-5.fna&_nc_gid=FSlrl6KxZrjaZ5xYjrcWoQ&_nc_ss=7a3a8&oh=00_Af3KiW4Ps_uTv4JXqdhY2z1qFvLHwrys5_CwHmHemdXsxg&oe=69D9BF55" 
    },
    { 
      name: "Egg", 
      image: "https://scontent.fcrk1-3.fna.fbcdn.net/v/t39.30808-6/623292784_10215010024681591_3397623146317691634_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeExhlCjuIdxK4sBrI1LWgisVfSos_7Da1JV9Kiz_sNrUj20I7WyvXbaZhdZI1x4oCQMdaDoZiJxiytEMw5hsQOg&_nc_ohc=nU0ALCNe8EEQ7kNvwHXcbF6&_nc_oc=AdpLOcAWz2AmnsMZQXnDVlP3ys6PUcbUTjUlLn_lRKpePYJrL7PfuzzBuIBdlhZsiRE&_nc_zt=23&_nc_ht=scontent.fcrk1-3.fna&_nc_gid=PmYeSiVeA_6vyLPgwcTS8g&_nc_ss=7a3a8&oh=00_Af300PxOeDgJe3VksluhaJpJQYo46uxF7hbN44mP_C-Y1A&oe=69D9E88F" 
    }
  ];

  const handleSelect = (profile) => {
    console.log(`Setting active profile to: ${profile.name}`);
    setUserProfile({
      name: profile.name,
      image: profile.image
    });
    navigate('/home');
  };

  return (
    <div className="profileSelection">
      <div className="profileSelection__container">
        <h1>Who's watching?</h1>
        <div className="profileSelection__list">
          {profiles.map((profile, index) => (
            <div 
              key={index} 
              className="profileSelection__item" 
              onClick={() => handleSelect(profile)}
            >
              <div className="profileSelection__avatarWrapper">
                <img 
                  src={profile.image} 
                  alt={profile.name} 
                  className="profileSelection__avatar"
                />
              </div>
              <span className="profileSelection__name">{profile.name}</span>
            </div>
          ))}
        </div>
        <button className="profileSelection__manage">Manage Profiles</button>
      </div>
    </div>
  );
}

export default ProfileSelection;