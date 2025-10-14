import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Heart, 
  Home, 
  Building2, 
  TreePine, 
  Waves,
  Wifi,
  Car,
  Coffee,
  Wind,
  Moon,
  Sun,
  Filter,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react'
import './App.css'

// Import property images
import property1 from './assets/property1.jpg'
import property2 from './assets/property2.jpg'
import property3 from './assets/property3.jpg'
import property4 from './assets/property4.jpg'
import property5 from './assets/property5.jpg'
import property6 from './assets/property6.jpg'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [favorites, setFavorites] = useState([])
  const [priceRange, setPriceRange] = useState('all')

  // Sample property data with enhanced details
  const properties = [
    {
      id: 1,
      title: 'Modern Cabin Retreat',
      location: 'Aspen, Colorado',
      price: 250,
      rating: 4.9,
      reviews: 128,
      image: property1,
      category: 'cabin',
      guests: 6,
      bedrooms: 3,
      amenities: ['Wifi', 'Kitchen', 'Parking', 'Fireplace'],
      host: 'Sarah',
      description: 'Stunning modern cabin with mountain views'
    },
    {
      id: 2,
      title: 'Luxury Mountain Lodge',
      location: 'Lake Tahoe, California',
      price: 380,
      rating: 4.95,
      reviews: 89,
      image: property2,
      category: 'cabin',
      guests: 8,
      bedrooms: 4,
      amenities: ['Wifi', 'Kitchen', 'Hot Tub', 'Fireplace'],
      host: 'Michael',
      description: 'Elegant lodge with lake access'
    },
    {
      id: 3,
      title: 'Cozy Fireplace Cabin',
      location: 'Whistler, Canada',
      price: 195,
      rating: 4.85,
      reviews: 156,
      image: property3,
      category: 'cabin',
      guests: 4,
      bedrooms: 2,
      amenities: ['Wifi', 'Fireplace', 'Parking'],
      host: 'Emma',
      description: 'Perfect winter getaway with stunning views'
    },
    {
      id: 4,
      title: 'Contemporary Apartment',
      location: 'Miami, Florida',
      price: 175,
      rating: 4.8,
      reviews: 203,
      image: property4,
      category: 'apartment',
      guests: 4,
      bedrooms: 2,
      amenities: ['Wifi', 'Pool', 'Gym', 'Parking'],
      host: 'David',
      description: 'Modern apartment near the beach'
    },
    {
      id: 5,
      title: 'Skyline Penthouse',
      location: 'New York, NY',
      price: 450,
      rating: 5.0,
      reviews: 67,
      image: property5,
      category: 'apartment',
      guests: 6,
      bedrooms: 3,
      amenities: ['Wifi', 'Gym', 'Concierge', 'Parking'],
      host: 'Jennifer',
      description: 'Luxury penthouse with breathtaking city views'
    },
    {
      id: 6,
      title: 'Urban Loft',
      location: 'Brooklyn, NY',
      price: 220,
      rating: 4.75,
      reviews: 142,
      image: property6,
      category: 'apartment',
      guests: 3,
      bedrooms: 1,
      amenities: ['Wifi', 'Kitchen', 'Workspace'],
      host: 'Alex',
      description: 'Stylish loft in trendy neighborhood'
    }
  ]

  const categories = [
    { id: 'all', label: 'All', icon: Home },
    { id: 'apartment', label: 'Apartments', icon: Building2 },
    { id: 'cabin', label: 'Cabins', icon: TreePine },
    { id: 'beachfront', label: 'Beachfront', icon: Waves }
  ]

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    )
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const filteredProperties = properties.filter(property => {
    const matchesCategory = selectedCategory === 'all' || property.category === selectedCategory
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = priceRange === 'all' || 
                        (priceRange === 'budget' && property.price < 200) ||
                        (priceRange === 'mid' && property.price >= 200 && property.price < 350) ||
                        (priceRange === 'luxury' && property.price >= 350)
    return matchesCategory && matchesSearch && matchesPrice
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">StayHub</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Explore</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Experiences</a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Become a Host</a>
            </nav>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
              <Button className="hidden md:flex">Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Search Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Find your perfect stay
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover unique homes, cabins, and apartments around the world
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Where are you going?" 
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Check-in</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="date" className="pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="number" placeholder="2" className="pl-10" min="1" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-4">
                  <Button className="flex-1" size="lg">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border bg-background/50 sticky top-[73px] z-40 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {categories.map(category => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                </Button>
              )
            })}
            <div className="ml-auto flex items-center gap-2">
              <select 
                className="text-sm border rounded-md px-3 py-2 bg-background"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="budget">Budget (&lt; $200)</option>
                <option value="mid">Mid-range ($200-$350)</option>
                <option value="luxury">Luxury ($350+)</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-foreground">
              {filteredProperties.length} stays available
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(property => (
              <Card 
                key={property.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-background/80 hover:bg-background rounded-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(property.id)
                    }}
                  >
                    <Heart 
                      className={`h-5 w-5 ${favorites.includes(property.id) ? 'fill-red-500 text-red-500' : ''}`}
                    />
                  </Button>
                  <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground">
                    {property.category}
                  </Badge>
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{property.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {property.location}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {property.rating}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {property.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {property.guests} guests
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {property.bedrooms} bedrooms
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.slice(0, 3).map(amenity => (
                      <Badge key={amenity} variant="outline" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t pt-4">
                  <div>
                    <span className="text-2xl font-bold text-foreground">${property.price}</span>
                    <span className="text-sm text-muted-foreground"> / night</span>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No properties found matching your criteria</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setPriceRange('all')
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Why choose StayHub?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the best in vacation rentals with our enhanced features and exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Advanced Search</h4>
              <p className="text-muted-foreground">
                Find exactly what you're looking for with powerful filters and search options
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Verified Reviews</h4>
              <p className="text-muted-foreground">
                Read authentic reviews from real guests to make informed decisions
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Interactive Maps</h4>
              <p className="text-muted-foreground">
                Explore locations with our enhanced map view and discover nearby attractions
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Home className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-bold">StayHub</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Your gateway to unique accommodations and unforgettable experiences worldwide.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cancellation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Hosting</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Become a Host</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Host Resources</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community Forum</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Hosting Responsibly</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 StayHub. All rights reserved. Built with React and Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

