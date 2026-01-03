import asyncio
from app.database import AsyncSessionLocal
from app.models.city import City
from app.models.activity import Activity
from sqlalchemy import select

async def seed_data():
    async with AsyncSessionLocal() as db:
        # Check if data exists
        result = await db.execute(select(City))
        if result.scalars().first():
            print("Data already exists.")
            return

        print("Seeding cities...")
        cities = [
            City(
                name="Paris",
                country="France",
                region="Europe",
                image_url="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600",
                cost_index="expensive",
                rating=4.9,
                description="The City of Lights, known for its art, fashion, and romantic atmosphere."
            ),
            City(
                name="Tokyo",
                country="Japan",
                region="Asia",
                image_url="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600",
                cost_index="expensive",
                rating=4.8,
                description="A dazzling blend of ultra-modern and traditional Japanese culture."
            ),
            City(
                name="Barcelona",
                country="Spain",
                region="Europe",
                image_url="https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600",
                cost_index="moderate",
                rating=4.7,
                description="Mediterranean vibes with stunning Gaudí architecture and beaches."
            ),
             City(
                name="Bali",
                country="Indonesia",
                region="Asia",
                image_url="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
                cost_index="budget",
                rating=4.7,
                description="Tropical paradise with spiritual temples and lush landscapes."
            ),
            City(
                name="New York",
                country="USA",
                region="Americas",
                image_url="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600",
                cost_index="luxury",
                rating=4.8,
                description="The city that never sleeps, a global hub of culture and commerce."
            ),
            City(
                name="Marrakech",
                country="Morocco",
                region="Africa",
                image_url="https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600",
                cost_index="budget",
                rating=4.5,
                description="Vibrant markets, stunning palaces, and rich Moroccan traditions."
            ),
        ]
        
        db.add_all(cities)
        await db.flush() # Get IDs
        
        city_map = {c.name: c.id for c in cities}

        print("Seeding activities...")
        activities = [
            Activity(
                city_id=city_map["Paris"],
                name="Eiffel Tower Sunset Visit",
                description="Skip-the-line access to the top of Paris's iconic landmark at sunset.",
                image_url="https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=400",
                duration_minutes=120,
                cost=45.00,
                category="sightseeing"
            ),
             Activity(
                city_id=city_map["Tokyo"],
                name="Sushi Making Class",
                description="Learn to make authentic sushi from a master chef in Tsukiji.",
                image_url="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400",
                duration_minutes=180,
                cost=85.00,
                category="food"
            ),
            Activity(
                city_id=city_map["Bali"],
                name="Bali Sunrise Volcano Hike",
                description="Trek to the summit of Mount Batur for a breathtaking sunrise view.",
                image_url="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400",
                duration_minutes=360,
                cost=55.00,
                category="adventure"
            ),
            Activity(
                city_id=city_map["Barcelona"],
                name="Flamenco Show & Tapas",
                description="Authentic flamenco performance in the Gothic Quarter with tapas dinner.",
                image_url="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400",
                duration_minutes=180,
                cost=70.00,
                category="culture"
            ),
        ]
        
        db.add_all(activities)
        await db.commit()
        print("Seeding completed!")

if __name__ == "__main__":
    asyncio.run(seed_data())

