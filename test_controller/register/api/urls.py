from register.api.views import ScoresViewSet
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r'', ScoresViewSet, basename='scores')
urlpatterns = router.urls
